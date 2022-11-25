import { AuthenticationResult, EventType } from '@azure/msal-browser';
import { msalInstance } from '@/config/authConfig';

export default () => {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
  msalInstance.addEventCallback(event => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const { account } = payload;
      msalInstance.setActiveAccount(account);
    }
  });
};
