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
  const jobCards = Array.from(document.getElementsByClassName("jobs-search-results__list-item"));

  jobCards.forEach(card => {
    const titleElements = card.getElementsByClassName("job-card-list__title");
    if (titleElements == 0)
      return;

    const titleElement = titleElements[0];
    if (!titleElement)
      return;

    const title = titleElements[0]?.getAttribute("aria-label") || "";

    const isNew = (card.getElementsByTagName("time").length > 0);
    const japanesePercentage = parseFloat(calculateJapanesePercentage(title));

    const isSelected = (card.getElementsByClassName("jobs-search-results-list__list-item--active").length > 0);

    // Example filtering logic (customize based on your needs)
    if (!isSelected && (!isNew || japanesePercentage > 70)) {
      card.style.display = 'none';
      //card.style.backgroundColor = 'red'
    }
  });
}

// Run the filter when the page loads and whenever it changes
filterJobs();
const observer = new MutationObserver(filterJobs);
observer.observe(document.body, { childList: true, subtree: true });