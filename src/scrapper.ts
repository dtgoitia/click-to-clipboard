type Query = string;
type MilliSeconds = number;

const WAITING_TIME: MilliSeconds = 1000;

async function wait(duration: MilliSeconds): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

class ElementNotFound extends Error {
  constructor(message: string) {
    super(message);
    const className = this.constructor.toString(); // TODO: ensure this works
    this.name = className;
  }
}

export async function waitUntilElementPresent(query: Query, timeout?: MilliSeconds) {
  const interval = WAITING_TIME;
  let waited: MilliSeconds = 0;
  let foundElements: Element | null = null;
  while (foundElements == undefined) {
    foundElements = document.querySelector(query);
    if (foundElements) {
      break;
    }

    wait(WAITING_TIME);

    if (timeout) {
      waited = waited + interval;
      if (timeout < waited) {
        throw new ElementNotFound(
          `No element matched the query (${query}) (timeout=${timeout})`,
        );
      }
    }
  }

  return Promise.resolve();
}
