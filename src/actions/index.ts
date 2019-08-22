import { createActions } from "redux-actions";

const { allow, disallow, toggle, updateActionIcon } = createActions({
  ALLOW: (url: string) => ({ url }),
  DISALLOW: (url: string) => ({ url }),
  TOGGLE: (url: string) => ({ url }),
  UPDATE_ACTION_ICON: (url: string) => ({ url })
});

export default { allow, disallow, toggle, updateActionIcon };
