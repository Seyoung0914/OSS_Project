import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching books from API...");
        const response = await axios.get("/api/books"); // API 호출
        const xmlData = response.data; // XML 데이터
        console.log("API Response:", xmlData);

        // XML 데이터를 JSON으로 변환
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, "text/xml");
        const rows = xmlDoc.getElementsByTagName("row");

        // 데이터를 배열로 변환
        const bookArray = Array.from(rows).map((row) => ({
          title: row.getElementsByTagName("TITLE")[0].textContent,
          author: row.getElementsByTagName("AUTHOR")[0].textContent,
          publisher: row.getElementsByTagName("PUBLER")[0].textContent,
          callNumber: row.getElementsByTagName("CALL_NO")[0].textContent,
        }));

        console.log("Parsed Books:", bookArray);
        setBooks(bookArray);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>도서 리스트</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> - {book.author} ({book.publisher})
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default ShowList;
