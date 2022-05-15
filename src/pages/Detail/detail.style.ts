import styled from "styled-components";

export const StyledDetail = styled.div`
  .detail-top {
    display: flex;
    gap: 30px;
  }
  .detail-thumb {
    img {
      width: 220px;
      height: 310px;
      border-radius: 20px;
    }
  }
  .detail-content {
    flex: 1;
    gap: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detail-header {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .detail-heading {
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .detail-score {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    span {
      font-size: 2.2rem;
      color: #e8b647;
    }
  }
  .detail-introduction {
    line-height: 1.8;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
  .detail-categoríes {
    display: flex;
    gap: 20px;
  }
  .detail-watch {
    width: 210px;
    height: 50px;
    border-radius: 40px;
    color: var(--white);
    background-color: #e62e8f;
  }
  .detail-bottom {
    margin-top: 50px;
  }
  .detail-summary {
    line-height: 1.9;
  }
  .detail-banner {
    margin: 30px 0;
    border-radius: 14px;
    width: 100%;
  }
  .label {
    font-weight: 600;
    padding-right: 10px;
  }
  @media screen and (max-width: 767.98px) {
    .detail-top {
      flex-direction: column;
    }
  }
`;
