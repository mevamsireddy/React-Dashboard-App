export const saveWidgetsToFile = async (widgets) => {
    try {
      const response = await fetch('/widgets.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categories: widgets }),
      });
      if (!response.ok) {
        throw new Error('Failed to save widgets to JSON file');
      }
    } catch (error) {
      console.error('Error saving widgets:', error);
    }
  };