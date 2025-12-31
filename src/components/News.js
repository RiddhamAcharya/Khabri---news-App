import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  document.title = `Khabri - ${
    props.category.charAt(0).toUpperCase() + props.category.slice(1)
  }`;

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.PageSize}`;

    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(prevPage => prevPage + 1);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.PageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className="text-center my-2" style={{ margin: "35px 0px" }}>
        Khabri - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) + "..." : ""}
                  description={element.description ? element.description.slice(0, 88) + "..." : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author || "Unknown"}
                  date={new Date(element.publishedAt).toGMTString()}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "us",
  PageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  PageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
