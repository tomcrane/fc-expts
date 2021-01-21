
/*
    Constructs a fake Florentine Codex with the correct 12 books, but then random chapters per book and pages per chapter.
    This is no good for aliging to images obviously, but can be used to experiment with structural navigation.
    NB the real Florentine Codex has 12 books, across 2446 pages, with 2486 illuminations.
*/
function makeCodex(){
    let codex = {
    books: [
        { "book": 1, "label": "The Gods", "description": "Deals with gods worshipped by the natives of this land, which is New Spain."},
        { "book": 2, "label": "The Ceremonies", "description": "Deals with holidays and sacrifices with which these natives honored their gods in times of infidelity."},
        { "book": 3, "label": "The Origin of the Gods", "description": "About the creation of the gods."},
        { "book": 4, "label": "The Soothsayers", "description": "About Indian judiciary astrology or omens and fortune-telling arts."},
        { "book": 5, "label": "The Omens", "description": "Deals with foretelling these natives made from birds, animals, and insects in order to foretell the future."},
        { "book": 6, "label": "Rhetoric and Moral Philosophy", "description": "About prayers to their gods, rhetoric, moral philosophy, and theology in the same context."},
        { "book": 7, "label": "The Sun, Moon and Stars, and the Binding of the Years", "description": "Deals with the sun, the moon, the stars, and the jubilee year."},
        { "book": 8, "label": "Kings and Lords", "description": "About kings and lords, and the way they held their elections and governed their reigns."},
        { "book": 9, "label": "The Merchants", "description": "About long-distance elite merchants, pochteca, who expanded trade, reconnoitered new areas to conquer, and agents-provocateurs."},
        { "book": 10, "label": "The People", "description": "About general history: it explains vices and virtues, spiritual as well as bodily, of all manner of persons."},
        { "book": 11, "label": "Earthly Things", "description": "About properties of animals, birds, fish, trees, herbs, flowers, metals, and stones, and about colors."},
        { "book": 12, "label": "The Conquest", "description": "About the conquest of New Spain from the Tenochtitlan-Tlatelolco point of view."},
    ],
    pages: [] 
};

    // You can turn these dials to experiment with the number of structures and how variable in size they are.
    let chapter_seed = 10;
    let chapter_variation = 3;
    let pages_per_chapter_seed = 20;
    let pages_variation = 5;

    let codex_page = 0;
    let book_page = 0;
    let chapter_page = 0;

    for(book of codex.books){
        chapter_count = getVariation(chapter_seed, chapter_variation);
        book.chapters = [];
        book_page = 0;
        for(let c = 0; c < chapter_count; c++){
            let chapter = {
                chapter: c + 1,
                pages: [],
                label: "Chapter " + (c + 1)
            }
            book.chapters.push(chapter);
            page_count = getVariation(pages_per_chapter_seed, pages_variation);
            chapter_page = 0;
            for(let p = 0; p < page_count; p++){
                let page = {
                    codex_page: ++codex_page,
                    book_page: ++book_page,
                    chapter_page: ++chapter_page,
                    label: book.book + "-" + book_page + (book_page % 2 == 0 ? "r" : "v"),
                    book: book,
                    chapter: chapter
                }
                chapter.pages.push(page);
                codex.pages.push(page);
            }
        }
        last_chapter = book.chapters[book.chapters.length - 1];
        if(book_page % 2 == 1){
            last_chapter.pages.push({
                codex_page: ++codex_page,
                book_page: ++book_page,
                chapter_page: ++chapter_page,
                book: book
            })
        }
        last_page = last_chapter.pages[last_chapter.pages.length - 1];
        last_page.label = "[End of book " + book.book + "]";
    }

    return codex;

}


function getVariation(seed, variation){
    max = seed + variation;
    min = seed - variation;
    const r = Math.random()*(max-min) + min;
    return Math.ceil(r);
}
