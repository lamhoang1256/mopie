import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useSWRInfinite from "swr/infinite";
import { getHome } from "apis/configAPI";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import SkeletonTitle from "components/Skeleton/SkeletonTitle";
import HomeBanner from "./module/HomeBanner/HomeBanner";
import HomePopular from "./module/HomePopular/HomePopular";
import HomeList from "./module/HomeList/HomeList";
import HomeSide from "./module/HomeSide/HomeSide";
import HomeCardSkeleton from "./module/HomeSkeleton/HomeCardSkeleton";
import { StyledHome, StyledWrapperLayout } from "./home.style";
import { StyledHomeList } from "./module/HomeList/homeList.style";

const Home = () => {
  const getKey = (index: number) => `page-${index || 0}`;
  const { data, error, setSize } = useSWRInfinite(
    getKey,
    (key: string) => getHome({ page: Number(key.split("page-")[1]) }),
    {
      revalidateFirstPage: false,
    },
  );

  return (
    <StyledHome>
      <HomeBanner />
      <StyledWrapperLayout className="container">
        <div className="wrapper-main">
          <HomePopular />
          {!data && (
            <StyledHomeList>
              <SkeletonTitle />
              <div className="home-list">
                {Array(12)
                  .fill(0)
                  .map(() => (
                    <HomeCardSkeleton key={uuidv4()} />
                  ))}
              </div>
            </StyledHomeList>
          )}
          {data && (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={() => setSize((size) => size + 1)}
              hasMore={!error && data?.slice(-1)?.[0].data?.recommendItems?.length !== 0}
              loader={<LoadingSpinner />}
              endMessage={
                <Link to="/explore">
                  <button type="button" className="seemore">
                    See more
                  </button>
                </Link>
              }
            >
              {data
                ?.reduce((prevData: any, currentData: any) => {
                  const suitableSections = [...currentData.data.recommendItems]?.filter(
                    (section: any) => section.bannerProportion !== 1 && section.coverType === 1,
                  );
                  return [...prevData, ...suitableSections];
                }, [])
                .map((homeSection) => (
                  <HomeList key={uuidv4()} homeSection={homeSection} />
                ))}
            </InfiniteScroll>
          )}
        </div>
        <div className="wrapper-side">
          <HomeSide />
        </div>
      </StyledWrapperLayout>
    </StyledHome>
  );
};

export default Home;
