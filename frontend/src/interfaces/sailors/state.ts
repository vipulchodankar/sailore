import Sailor from "../Sailor";

interface State {
  isLoading: boolean;
  list: Sailor[];
  selected: Sailor | null;
  isDialogOpen: boolean;
}

export default State;
