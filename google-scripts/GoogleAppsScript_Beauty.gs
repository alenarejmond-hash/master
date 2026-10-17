/**
 * GOOGLE APPS SCRIPT: ШАБЛОН ДЛЯ БЬЮТИ-САЛОНА И МАСТЕРОВ
 * 
 * Что умеет этот скрипт:
 * 1. doGet: отдаёт свободные окошки из таблицы на сайт.
 * 2. doPost: принимает новую запись с сайта, проверяет занятость,
 *    создает запись в Google Календаре (на телефоне мастера) и сохраняет в таблицу.
 * 3. sendMorningSummary: присылает утреннюю сводку записей на день (даже если отпуск или нет клиентов).
 */

// ==========================================
// НАСТРОЙКИ (МЕНЯЮТСЯ ПОД КАЖДОГО КЛИЕНТА)
// ==========================================
var CONFIG = {
  // Название листа со свободными слотами в вашей таблице
  SLOTS_SHEET_NAME: "Слоты",
  
  // Название листа, куда записываются клиенты
  BOOKINGS_SHEET_NAME: "Записи",
  
  // ID Календаря клиента (если оставить пустым, запись пойдет в ваш основной календарь)
  // Чтобы запись шла в отдельный календарь мастера: укажите здесь его ID из настроек календаря
  CALENDAR_ID: "", 

  // Telegram настройки (необязательно, если используется бот)
  TELEGRAM_BOT_TOKEN: "",
  TELEGRAM_CHAT_ID: ""
};

/**
 * 1. ОТДАЧА СЛОТОВ НА САЙТ (doGet)
 */
function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SLOTS_SHEET_NAME);
    
    if (!sheet) {
      return createJsonResponse([]);
    }

    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) {
      return createJsonResponse([]);
    }

    var result = [];
    // Предполагается: колонка A - дата (например, 27.10.2026), колонка B, C, D... - время
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var rawDate = row[0];
      if (!rawDate) continue;

      var dateStr = formatDateString(rawDate);
      var times = [];

      for (var col = 1; col < row.length; col++) {
        var val = String(row[col]).trim();
        if (val) {
          times.push(val);
        }
      }

      if (times.length > 0) {
        result.push({
          id: i,
          date: dateStr,
          times: times
        });
      }
    }

    return createJsonResponse(result);

  } catch (error) {
    return createJsonResponse({ error: error.toString() });
  }
}

/**
 * 2. ПРИЕМ ЗАПИСИ С САЙТА (doPost)
 */
function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents);
    var name = postData.name || "";
    var phone = postData.phone || "";
    var whatsapp = postData.whatsapp || "";
    var service = postData.service || "";
    var slot = postData.slot || ""; // Формат: "27.10.2026 14:00"
    var comment = postData.comment || "";
    var timestamp = new Date();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var bookingsSheet = ss.getSheetByName(CONFIG.BOOKINGS_SHEET_NAME);
    if (!bookingsSheet) {
      bookingsSheet = ss.insertSheet(CONFIG.BOOKINGS_SHEET_NAME);
      bookingsSheet.appendRow(["Дата создания", "Имя", "Телефон", "WhatsApp", "Услуга", "Слот", "Комментарий"]);
    }

    // Сохраняем в таблицу
    bookingsSheet.appendRow([timestamp, name, phone, whatsapp, service, slot, comment]);

    // Создаем событие в Календаре
    createCalendarEvent(name, phone, service, slot, comment);

    // Удаляем занятое время из списка свободных слотов
    removeBookedSlot(slot);

    // Отправляем уведомление в Telegram (если настроен бот)
    if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
      var msg = "🌸 *Новая запись!*\n\n" +
                "👤 *Имя:* " + name + "\n" +
                "📞 *Тел:* " + phone + "\n" +
                "💅 *Услуга:* " + service + "\n" +
                "⏰ *Время:* " + slot + "\n" +
                (comment ? "💬 *Комментарий:* " + comment : "");
      sendTelegramMessage(msg);
    }

    return createJsonResponse({ status: "success" });

  } catch (error) {
    return createJsonResponse({ status: "error", message: error.toString() });
  }
}

/**
 * 3. СОЗДАНИЕ ЗАПИСИ В КАЛЕНДАРЕ
 */
function createCalendarEvent(name, phone, service, slotStr, comment) {
  try {
    var calendar = CONFIG.CALENDAR_ID 
      ? CalendarApp.getCalendarById(CONFIG.CALENDAR_ID)
      : CalendarApp.getDefaultCalendar();

    if (!calendar) return;

    // Парсим дату и время: "27.10.2026 14:00"
    var parts = slotStr.split(" ");
    if (parts.length < 2) return;

    var dateParts = parts[0].split(".");
    var timeParts = parts[1].split(":");

    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var year = parseInt(dateParts[2], 10);
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);

    var startTime = new Date(year, month, day, hours, minutes);
    // Длительность по умолчанию — 2 часа
    var endTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000));

    var title = name + " — " + service;
    var description = "Телефон: " + phone + "\nУслуга: " + service + "\n" + (comment ? "Пожелания: " + comment : "");

    calendar.createEvent(title, startTime, endTime, {
      description: description
    });

  } catch (e) {
    Logger.log("Ошибка создания в календаре: " + e.toString());
  }
}

/**
 * 4. УТРЕННЯЯ СВОДКА (Срабатывает каждый день по таймеру)
 */
function sendMorningSummary() {
  try {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    var calendar = CONFIG.CALENDAR_ID 
      ? CalendarApp.getCalendarById(CONFIG.CALENDAR_ID)
      : CalendarApp.getDefaultCalendar();

    if (!calendar) return;

    var events = calendar.getEvents(today, endOfDay);
    var message = "";

    if (events.length === 0) {
      // Чтобы не было обрыва связи — всегда пишем сообщение!
      message = "☀️ *Доброе утро!*\n\nНа сегодня записей нет. Отличного дня и хорошего отдыха! 🌸";
    } else {
      message = "☀️ *Доброе утро!*\n\n📋 *Ваше расписание на сегодня (" + events.length + " записей):*\n\n";
      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        var timeStr = Utilities.formatDate(ev.getStartTime(), Session.getScriptTimeZone(), "HH:mm");
        message += (i + 1) + ". ⏰ *" + timeStr + "* — " + ev.getTitle() + "\n";
      }
    }

    if (CONFIG.TELEGRAM_BOT_TOKEN && CONFIG.TELEGRAM_CHAT_ID) {
      sendTelegramMessage(message);
    }

  } catch (error) {
    Logger.log("Ошибка сводки: " + error.toString());
  }
}

/**
 * ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
 */
function removeBookedSlot(slotStr) {
  try {
    var parts = slotStr.split(" ");
    if (parts.length < 2) return;
    var datePart = parts[0];
    var timePart = parts[1];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(CONFIG.SLOTS_SHEET_NAME);
    if (!sheet) return;

    var data = sheet.getDataRange().getValues();
    for (var r = 1; r < data.length; r++) {
      if (formatDateString(data[r][0]) === datePart) {
        for (var c = 1; c < data[r].length; c++) {
          if (String(data[r][c]).trim() === timePart) {
            sheet.getRange(r + 1, c + 1).clearContent();
            return;
          }
        }
      }
    }
  } catch (e) {
    Logger.log("Ошибка очистки слота: " + e.toString());
  }
}

function formatDateString(rawDate) {
  if (rawDate instanceof Date) {
    return Utilities.formatDate(rawDate, Session.getScriptTimeZone(), "dd.MM.yyyy");
  }
  return String(rawDate).trim();
}

function sendTelegramMessage(text) {
  if (!CONFIG.TELEGRAM_BOT_TOKEN || !CONFIG.TELEGRAM_CHAT_ID) return;
  var url = "https://api.telegram.org/bot" + CONFIG.TELEGRAM_BOT_TOKEN + "/sendMessage";
  var payload = {
    chat_id: CONFIG.TELEGRAM_CHAT_ID,
    text: text,
    parse_mode: "Markdown"
  };
  UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
