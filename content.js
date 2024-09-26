function calculateJapanesePercentage(str) {
  // Remove spaces and non-character symbols
  const cleanStr = str.replace(/\s+/g, '').replace(/[^\p{L}\p{N}]/gu, '');

  // Count Japanese characters (kanji, hiragana, and katakana)
  const japaneseCount = (cleanStr.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]/g) || []).length;

  // Calculate percentage
  const percentage = (japaneseCount / cleanStr.length) * 100;

  return percentage.toFixed(2);
}

function filterJobs() {
  window.setTimeout(() => {
    const jobCards = $("li.jobs-search-results__list-item");

    jobCards.each((i, card) => {

      if (!$(card)) {
        return;
      }

      const titleElement = $(card).find(".job-card-list__title").first();
      const title = titleElement?.attr("aria-label") || "";

      const isNew = $(card).find("time").length > 0;
      const japanesePercentage = parseFloat(calculateJapanesePercentage(title));
      const isSelected = $(card).find(".jobs-search-results-list__list-item--active").length > 0;

      const shouldHide = !isSelected && (!isNew || japanesePercentage > 70);

      console.log(title + " = " + isNew + "/" + japanesePercentage + "/" + isSelected);

      if (shouldHide) {
        $(card).css("opacity", 0.15);
      }
      else {
        $(card).css("opacity", '');
      }
    });
  }, 200);
}

function highlightJapaneseWord() {
  $(".highlight").css({ backgroundColor: "red", fontWeight: "bold" });
  $(".jobs-details").highlight(["Japanese", "Japanisch", "Bilingual"]);
}

function init() {

  window.setInterval(filterJobs, 500);
  window.setInterval(highlightJapaneseWord, 500);
}

$(init);