import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import { HiFaceFrown } from "react-icons/hi2";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.div`
  height: 100%;
  margin-top: -40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  & p > svg {
    font-size: 2.5rem;
  }
`;

function TodayActivity() {
  const { todayActivity, isPending } = useTodayActivity();

  console.log(todayActivity);
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {!isPending && todayActivity.length > 0 ? (
        <TodayList>
          {todayActivity.map((act) => (
            <TodayItem activity={act} key={act.id} />
          ))}
        </TodayList>
      ) : (
        <NoActivity>
          <p>
            <HiFaceFrown />
            <span>No activity for today.</span>
          </p>
        </NoActivity>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
