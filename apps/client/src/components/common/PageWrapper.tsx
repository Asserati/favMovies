import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

type PageWrapperProps = {
  state: string; // Replace 'any' with the actual type of your state
  children: ReactNode;
};

const PageWrapper = ({ state, children }: PageWrapperProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
