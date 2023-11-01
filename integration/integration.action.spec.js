// npx jest test.js
const axios = require('axios');
const { onExecutePostLogin } = require('./integration.action'); // Replace 'yourFilePath' with the actual path to your file

jest.mock('axios');

describe('onExecutePostLogin', () => {
  it('should return smart wallet address if user email is verified', async () => {
    const event = {
      user: {
        email_verified: true,
        email: 'test@example.com',
      },
      secrets: {
        AUTH0_ADMIN_FRONTEND_URL: 'your_frontend_url',
        FRONTEND_ACCESS_API: 'your_access_api_url',
        LOGIN_API: 'your_login_api_url',
      },
    };

    const api = {
      access: {
        deny: jest.fn(),
      },
    };

    const responseData = {
      smartWalletAddress: '0xBFc1F88080FadaBb48a1AB4B92dda7A7480D9328',
    };

    axios.request.mockImplementationOnce(() =>
      Promise.resolve({ data: { token: 'test_token' } })
    );

    axios.request.mockImplementationOnce(() =>
      Promise.resolve({ data: responseData })
    );

    const result = await onExecutePostLogin(event, api);

    expect(result).toEqual(responseData.smartWalletAddress);
    expect(api.access.deny).not.toHaveBeenCalled();
  });

  it('should deny access if the user email is not verified', async () => {
    const event = {
      user: {
        email_verified: false,
        email: 'test@example.com',
      },
      secrets: {
        AUTH0_ADMIN_FRONTEND_URL: 'your_frontend_url',
        FRONTEND_ACCESS_API: 'your_access_api_url',
        LOGIN_API: 'your_login_api_url',
      },
    };

    const api = {
      access: {
        deny: jest.fn(),
      },
    };

    const result = await onExecutePostLogin(event, api);

    expect(result).toBeUndefined();
    expect(api.access.deny).toHaveBeenCalledWith('Email not verified');
  });

  it('should deny access if access token is not found', async () => {
    const event = {
      user: {
        email_verified: true,
        email: 'test@example.com',
      },
      secrets: {
        AUTH0_ADMIN_FRONTEND_URL: 'your_frontend_url',
        FRONTEND_ACCESS_API: 'your_access_api_url',
        LOGIN_API: 'your_login_api_url',
      },
    };

    const api = {
      access: {
        deny: jest.fn(),
      },
    };

    axios.request.mockImplementationOnce(() =>
      Promise.resolve({ data: { token: null } })
    );

    const result = await onExecutePostLogin(event, api);

    expect(result).toBeUndefined();
    expect(api.access.deny).toHaveBeenCalledWith('Access token not found');
  });

  it('should handle errors properly', async () => {
    const event = {
      user: {
        email_verified: true,
        email: 'test@example.com',
      },
      secrets: {
        AUTH0_ADMIN_FRONTEND_URL: 'your_frontend_url',
        FRONTEND_ACCESS_API: 'your_access_api_url',
        LOGIN_API: 'your_login_api_url',
      },
    };
  
    const api = {
      access: {
        deny: jest.fn(),
      },
    };
  
    axios.request.mockImplementationOnce(() => {
      throw new Error('Test error');
    });
  
    const result = await onExecutePostLogin(event, api);
  
    expect(result).toBeUndefined();
    expect(api.access.deny).toHaveBeenCalledWith('Something went wrong');
  });
});


// const { makeEventMock } = require("../__mocks__/event-post-login");
// const { apiMock } = require("../__mocks__/api-post-login");

// const { onExecutePostLogin } = require("./integration.action");

// describe("Action integration", () => {
//   let consoleLogMock;
//   let eventMock;

//   beforeEach(() => {
//     consoleLogMock = jest.spyOn(console, "log").mockImplementation();
//     eventMock = makeEventMock();
//   });

//   afterEach(() => {
//     consoleLogMock.mockRestore();
//     jest.clearAllMocks();
//   });

//   describe("onExecutePostLogin", () => {
//     it("executes", async () => {
//       expect(async () => {
//         await onExecutePostLogin(eventMock, apiMock);
//       }).not.toThrow();
//     });
//   });
// });


