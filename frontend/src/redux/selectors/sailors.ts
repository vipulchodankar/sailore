export const selectSailorsIsLoading = ({ sailors }: any) => sailors.isLoading;
export const selectSailorsList = ({ sailors }: any) => sailors.list;
export const selectSelectedSailor = ({ sailors }: any) => sailors.selected;
export const selectSailorIsDialogOpen = ({ sailors }: any) =>
  sailors.isDialogOpen;
