// npx jest test.js
const axios = require('axios');
const { onExecutePostLogin } = require('./integration/integration.action'); // Replace 'yourFilePath' with the actual path to your file

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
      smartWalletAddress: 'test_smart_wallet_address',
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
