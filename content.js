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

function linkChanged(mutations, observer) {
  var titleLink = mutations[0].target;
  var span = $(titleLink).find("span.highlight");
  if(!span) return;

  var spanIndex = $(titleLink).contents().index(span);
  if(spanIndex >= 0) {
    $(titleLink).contents().slice(spanIndex).remove();
  }
}

function init() {

  var titleLinkObj = $("div.job-details-jobs-unified-top-card__job-title").find("a");
  var titleLink = titleLinkObj.first()[0];

  if (!titleLink) {
    window.setTimeout(init, 200);
    return;
  }

  var observer = new MutationObserver(linkChanged);
  observer.observe(titleLink, {
    attributes: true,
    attributeFilter: ['href']
  });

  titleLink.dataset.selectContentVal = 1;

  window.setInterval(filterJobs, 500);
  window.setInterval(highlightJapaneseWord, 500);
}

$(init);