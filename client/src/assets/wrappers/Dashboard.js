import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw; // 90% of page width
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 995px) {
    .dashboard {
      grid-template-columns: auto 1fr; // width of big sidebar, then the rest in the 2nd column
    }
    .dashboard-page {
      width: 90%; // 90% of content not page width
    }
  }
`;
export default Wrapper;
