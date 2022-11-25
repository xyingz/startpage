import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

export const msLoginConfig = {
  Microsoft: {
    TenantId: '6407c5bc-634e-4146-90c2-bf6e16097c24',
    ClientId: '19fda7a9-42e0-4799-b3df-6eb5dac0ecb8'
    // TenantId: '6407c5bc-634e-4146-90c2-bf6e16097c24',
    // ClientId: '18eed8c8-dedd-49d1-88a2-2b25655d3b14'
  }
};

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: msLoginConfig.Microsoft.ClientId,
    authority: `https://login.microsoftonline.com/${msLoginConfig.Microsoft.TenantId}`,
    redirectUri: '/', // Must be registered as a SPA redirectURI on your app registration
    postLogoutRedirectUri: '/' // Must be registered as a SPA redirectURI on your app registration
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (
        level: LogLevel,
        message: string,
        containsPii: boolean
      ) => {
        if (containsPii) {
          return;
        }
        // eslint-disable-next-line default-case
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
        }
      },
      logLevel: LogLevel.Verbose
    }
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [
    'openid',
    'profile',
    'User.Read',
    'offline_access',
    'Files.ReadWrite.AppFolder',
    'Sites.Read.All',
    'Files.ReadWrite.All',
    'Sites.ReadWrite.All'
  ]
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
  graphOneDriveEndpoint:
    'https://graph.microsoft.com/v1.0/me/drive/root/children'
  // graphOneDriveEndpoint: 'https://api.onedrive.com/v1.0/drive/root'
};
