const GlobalApi = {
  CreateNewResume: async (data) => {
    // Mock implementation of creating a new resume
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            data: {
              documentId: data.data.resumeId,
            },
          },
        });
      }, 500);
    });
  },
  // Add other API methods as needed with mock implementations
};

export default GlobalApi;
