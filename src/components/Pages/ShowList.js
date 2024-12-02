import React, { useEffect, useState } from "react";

const ShowList = ({ books, setBooks, cart, addToCart }) => {
  const [filteredBooks, setFilteredBooks] = useState([]); // 필터링된 도서
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [showAvailableOnly, setShowAvailableOnly] = useState(false); // 대여 가능만 보기
  const [languageFilter, setLanguageFilter] = useState(""); // 언어 필터
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const itemsPerPage = 20; // 한 페이지에 표시할 항목 수
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  useEffect(() => {
    const fetchBooks = () => {
      const xhr = new XMLHttpRequest();
      const url =
        "http://openapi.seoul.go.kr:8088/58624c767a63796c37386a42726a66/xml/SeoulLibraryBookSearchInfo/1/999";

      xhr.open("GET", url);
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200 || xhr.status === 201) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(this.responseText, "application/xml");
            const items = Array.from(xmlDoc.getElementsByTagName("row")).map((item) => ({
              CTRLNO: item.getElementsByTagName("CTRLNO")[0]?.textContent,
              TITLE: item.getElementsByTagName("TITLE")[0]?.textContent,
              AUTHOR: item.getElementsByTagName("AUTHOR")[0]?.textContent,
              PUBLER: item.getElementsByTagName("PUBLER")[0]?.textContent,
              LANG_NAME: item.getElementsByTagName("LANG_NAME")[0]?.textContent || "기타",
            }));
            setBooks(items);
            setFilteredBooks(items);
          } else {
            console.error("Error: Failed to fetch data", xhr.status);
          }
        }
      };
      xhr.send();
    };

    fetchBooks();
  }, [setBooks]);

  // 나머지 ShowList 구현은 기존 코드와 동일
  useEffect(() => {
    let updatedBooks = books;
    if (searchKeyword) {
      updatedBooks = updatedBooks.filter((book) =>
        book.TITLE.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    if (showAvailableOnly) {
      updatedBooks = updatedBooks.filter(
        (book) => !cart.some((item) => item.CTRLNO === book.CTRLNO)
      );
    }
    if (languageFilter) {
      updatedBooks = updatedBooks.filter((book) => book.LANG_NAME === languageFilter);
    }
    setFilteredBooks(updatedBooks);
  }, [books, searchKeyword, showAvailableOnly, languageFilter, cart]);

  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h1>도서 리스트</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <select
          onChange={(e) => setLanguageFilter(e.target.value)}
          value={languageFilter}
        >
          <option value="">모든 언어</option>
          <option value="한국어">한국어</option>
          <option value="영어">영어</option>
          <option value="기타">기타</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
          />
          대여 가능 도서만 보기
        </label>
      </div>

      <div id="data-list">
        {displayedBooks.map((book) => (
          <div key={book.CTRLNO} className="book-item">
            <span>{`${book.TITLE} - ${book.AUTHOR} (${book.PUBLER})`}</span>
            <button
              className="btn btn-warning"
              onClick={() => addToCart(book)}
              disabled={cart.some((item) => item.CTRLNO === book.CTRLNO)}
            >
              {cart.some((item) => item.CTRLNO === book.CTRLNO) ? "장바구니에 있음" : "장바구니 추가"}
            </button>
            <button
              className="btn btn-info"
              onClick={() => alert(`상세정보: ${book.TITLE}`)} // 상세보기 페이지로 연결 필요
            >
              상세보기
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
