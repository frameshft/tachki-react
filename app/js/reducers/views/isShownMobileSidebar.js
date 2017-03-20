export default function isShownMobileSidebar(state = false, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return false;
    default:
      return state;
  }
}
