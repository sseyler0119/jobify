import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
//   const pages = Array.from({ length: numOfPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber); // name must match server, 'page' is what we are using on server
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  /* note placement matters for the if-statements, they must be in order */
  const renderPageButtons = () => {
    const pageButtons = [];
    // add the first page button
    pageButtons.push(addPageButton({pageNumber: 1, activeClass: currentPage === 1}));
    // add the dots before the current page if there are > 3 pages
    if(currentPage > 3) {
        pageButtons.push(
            <span className="page-btn dots" key='dots-1'>...</span>
        )
    }
    // one page before current page 
    if(currentPage !== 1 && currentPage !== 2) {
        pageButtons.push(addPageButton({pageNumber: currentPage - 1, activeClass: false}));
    }
    // current page
    if(currentPage !== 1 && currentPage !== numOfPages) {
        pageButtons.push(addPageButton({pageNumber: currentPage, activeClass: true}))
    }

    // one page after current page
    if(currentPage !== numOfPages && currentPage !== numOfPages -1) {
        pageButtons.push(addPageButton({pageNumber: currentPage + 1, activeClass: false}));
    }

    if(currentPage < numOfPages - 2) {
        pageButtons.push(
            <span className="page-btn dots" key='dots+1'>...</span>
        )
    }
    // add the last page button
    pageButtons.push(
      addPageButton({ pageNumber: numOfPages, activeClass: currentPage === numOfPages })
    );
    return pageButtons;
  };
  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      {/* modify previous code to just call renderPageButtons method */}
      <div className='btn-container'>{renderPageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight />
        next
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
