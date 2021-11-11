// Declare any missing types here

type TODO = unknown;

declare namespace browser.contextMenus {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/create
  function create(
    createProperties: {
      checked?: boolean;
      command?:
        | "_execute_browser_action"
        | "_execute_page_action"
        | "_execute_sidebar_action";
      contexts?: ContextType[];
      documentUrlPatterns?: string[];
      enabled?: boolean;
      icons?: object;
      id?: string;
      onclick?: (info: OnClickData, tab: browser.tabs.Tab) => void;
      parentId?: number | string;
      targetUrlPatterns?: string[];
      title?: string;
      type?: ItemType;
      visible?: boolean;
    },
    callback?: () => void,
  ): number | string;
  const onClicked: EvListener<(info: OnClickData, tab: browser.tabs.Tab) => void>;
}
