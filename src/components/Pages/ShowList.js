import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowList = ({ cart = [], addToCart = () => {} }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState("TITLE");
  const [sortType, setSortType] = useState("CTRLNO"); // 정렬 기준
  const [languageFilter, setLanguageFilter] = useState(""); // 언어 필터
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const itemsPerPage = 20;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("/api/books");
        const xmlData = response.data;

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "application/xml");

        const resultCode = xmlDoc.getElementsByTagName("CODE")[0]?.textContent;
        if (resultCode !== "INFO-000") {
          throw new Error(
            xmlDoc.getElementsByTagName("MESSAGE")[0]?.textContent || "API Error"
          );
        }

        const rows = xmlDoc.getElementsByTagName("row");
        const bookArray = Array.from(rows).map((row) => ({
          CTRLNO: row.getElementsByTagName("CTRLNO")[0]?.textContent || "N/A",
          TITLE: row.getElementsByTagName("TITLE")[0]?.textContent || "제목 없음",
          AUTHOR: row.getElementsByTagName("AUTHOR")[0]?.textContent || "저자 없음",
          PUBLER: row.getElementsByTagName("PUBLER")[0]?.textContent || "출판사 없음",
          PUBLER_YEAR: row.getElementsByTagName("PUBLER_YEAR")[0]?.textContent || "N/A",
          LANG: row.getElementsByTagName("LANG")[0]?.textContent || "기타",
          AVAILABLE: "대여 가능",
        }));

        setBooks(bookArray);
        setFilteredBooks(bookArray);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (!books || books.length === 0) return;

    let updatedBooks = books;

    if (searchKeyword) {
      updatedBooks = updatedBooks.filter((book) =>
        book[filterType]?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (showAvailableOnly) {
      updatedBooks = updatedBooks.filter(
        (book) => book.AVAILABLE === "대여 가능"
      );
    }

    if (languageFilter) {
      updatedBooks = updatedBooks.filter((book) => book.LANG === languageFilter);
    }

    if (sortType === "CTRLNO") {
      updatedBooks.sort((a, b) => a.CTRLNO.localeCompare(b.CTRLNO));
    } else if (sortType === "TITLE") {
      updatedBooks.sort((a, b) => a.TITLE.localeCompare(b.TITLE));
    } else if (sortType === "PUBLER_YEAR") {
      updatedBooks.sort((a, b) => a.PUBLER_YEAR - b.PUBLER_YEAR);
    }

    setFilteredBooks(updatedBooks);
  }, [searchKeyword, filterType, showAvailableOnly, languageFilter, sortType, books]);

  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>데이터를 불러오는 중입니다...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="container">
      <h1>도서 리스트</h1>
      <div className="filters" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option value="TITLE">제목</option>
            <option value="AUTHOR">저자</option>
            <option value="PUBLER">출판사</option>
          </select>
          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            style={{ marginLeft: "10px" }}
          >
            <option value="CTRLNO">자료코드 오름차순</option>
            <option value="TITLE">책 제목 사전순</option>
            <option value="PUBLER_YEAR">출판 연도 오름차순</option>
          </select>
          <select
            onChange={(e) => setLanguageFilter(e.target.value)}
            value={languageFilter}
            style={{ marginLeft: "10px" }}
          >
            <option value="">모든 언어</option>
            <option value="kor">한국어</option>
            <option value="eng">영어</option>
          </select>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
            />
            대여 가능 도서만 보기
          </label>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/cart")}
            style={{ marginRight: "10px" }}
          >
            장바구니 보기
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/rental")}>
            대여 리스트 보기
          </button>
        </div>
      </div>

      <div id="data-list" style={{ marginTop: "20px" }}>
        {displayedBooks.map((book) => (
          <div
            key={book.CTRLNO}
            className="book-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <div>
              <strong>{book.TITLE}</strong>
              <p>{`${book.AUTHOR} / ${book.PUBLER}`}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ marginTop: "10px" }}>
                <button
                  className="btn btn-warning"
                  onClick={() => addToCart(book)}
                  disabled={cart.some((item) => item.CTRLNO === book.CTRLNO)}
                  style={{ marginRight: "10px" }}
                >
                  {cart.some((item) => item.CTRLNO === book.CTRLNO)
                    ? "장바구니에 있음"
                    : "장바구니 추가"}
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => navigate(`/book/${book.CTRLNO}`)}
                >
                  상세보기
                </button>
              </div>
              <span style={{ marginTop: "10px", color: book.AVAILABLE === "대여 가능" ? "green" : "red" }}>
                {book.AVAILABLE}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredBooks.length / itemsPerPage) }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`page-btn ${currentPage === pageNumber ? "active" : ""}`}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ShowList;
