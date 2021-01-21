
let codex = makeCodex();
let currentBook = null;
let currentChapter = null;
let currentPage = null;

$("#bookSelect").on("change", selectBook);
$("#chapterSelect").on("change", selectChapter);
$("#pageSelect").on("change", selectPage);
$(".pager").on("click", navigate);

for (book of codex.books) {
    $("#bookSelect").append($('<option>', {
        value: book.book - 1,
        text: `Book ${book.book}: ${book.label}`
    }));
}
$("#bookSelect").val("0");
selectBook();

function setBook() {
    setProgress("bookProgress", currentBook.book, codex.books.length);
    currentChapter = currentBook.chapters[0];
    $("#chapterSelect").empty();
    for (chapter of currentBook.chapters) {
        $("#chapterSelect").append($('<option>', {
            value: chapter.chapter - 1,
            text: chapter.label
        }));
    }
    setChapter();
}

function setChapter() {
    setProgress("chapterProgress", currentChapter.chapter, currentBook.chapters.length);
    currentPage = currentChapter.pages[0];
    $("#pageSelect").empty();
    for (page of currentChapter.pages) {
        $("#pageSelect").append($('<option>', {
            value: page.chapter_page - 1,
            text: page.label
        }));
    }
    setPage();
}

function setPage() {
    setProgress("pageProgress", currentPage.chapter_page, currentChapter.pages.length);
    setProgress("overallProgress", currentPage.codex_page, codex.pages.length);
    setViewer();
}

function selectBook() {
    let idx = parseInt($("#bookSelect").val());
    currentBook = codex.books[idx];
    setBook();
}

function selectChapter() {
    let idx = parseInt($("#chapterSelect").val());
    currentChapter = currentBook.chapters[idx];
    setChapter();
}

function selectPage() {
    let idx = parseInt($("#pageSelect").val());
    currentPage = currentChapter.pages[idx];
    setPage();
}

function setViewer() {
    let markup = `
    ${currentPage.label}<br/>
    <br/>
    Page in chapter: ${currentPage.chapter_page}<br/>
    Page in book: ${currentPage.book_page}<br/>
    Page in codex: ${currentPage.codex_page}<br/>
    <br/>
    This page is in ${currentPage.chapter.label} of<br/>
    <strong>Book ${currentPage.book.book}: ${currentPage.book.label}</strong>.
    <br/>
    <em>${currentPage.book.description}</em>
    `;
    $("#thePage").html(markup);
}

function navigate() {
    let mode = this.getAttribute("data-page-what");
    let direction = this.getAttribute("data-direction");
    if(mode == "page"){
        if(direction == "next"){
            if(currentPage.codex_page < codex.pages.length){
                currentPage = codex.pages[currentPage.codex_page];
            }
        } else {
            if(currentPage.codex_page > 1){
                currentPage = codex.pages[currentPage.codex_page - 2];
            }
        }
    }
    if(mode == "chapter"){
        if(direction == "next"){
            if(currentChapter.chapter < currentBook.chapters.length){
                currentChapter = currentBook.chapters[currentChapter.chapter];
            }
        } else {
            if(currentChapter.chapter > 1){
                currentChapter = currentBook.chapters[currentChapter.chapter - 2];
            }
        }
        currentPage = currentChapter.pages[0];
    }
    if(mode == "book"){
        if(direction == "next"){
            if(currentBook.book < codex.books.length){
                currentBook = codex.books[currentBook.book];
            }
        } else {
            if(currentBook.book > 1){
                currentBook = codex.books[currentBook.book - 2];
            }
        }
        currentChapter = currentBook.chapters[0];
        currentPage = currentChapter.pages[0];
    }
    resetForCurrentPage();
}

function setProgress(id, val, max) {
    let pc = `${100 * (val / max)}%`;
    let $progressBar = $(`#${id}`);
    $progressBar.width(pc);
    $progressBar.html(`${val}/${max}`);
}

function resetForCurrentPage(){
    let tempPage = currentPage;
    $("#bookSelect").val(tempPage.book.book - 1);
    setBook();
    $("#chapterSelect").val(tempPage.chapter.chapter - 1);
    setChapter();
    $("#pageSelect").val(tempPage.chapter_page - 1);
    currentPage = tempPage;
    setPage();    
}