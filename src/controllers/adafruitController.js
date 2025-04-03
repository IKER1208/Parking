const { ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY, ADAFRUIT_BASE_URL } = process.env;



exports.getFeedData = async(req, res) => {
    try {
      const feedName = req.params.feedName;
      const response = await fetch(`${ADAFRUIT_BASE_URL}/${ADAFRUIT_IO_USERNAME}/feeds/${feedName}`, {
        headers: {
          'X-AIO-Key': ADAFRUIT_IO_KEY
        }
      });
      
      const data = await response.json();
      const result = data.last_value;
      res.status(200).json({
        message: 'Información del feed',
        result: result
      });
      return result;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return res.status(500).json({ message: 'Error al obtener datos del feed', error: error.message });
    }
};
exports.getAllFeeds = async(req, res) => {
    try {
        const response = await fetch(`${ADAFRUIT_BASE_URL}/${ADAFRUIT_IO_USERNAME}/feeds`, {
            headers: {
                'X-AIO-Key': ADAFRUIT_IO_KEY
            }
        });
        
        const data = await response.json();
        const result = data.map(feed => ({
            name: feed.name,
            last_value: feed.last_value
        }));
        res.status(200).json({
            message: 'Información de todos los feeds',
            result
        });
        return result;
    } catch (error) {
        console.error('Error al obtener datos:', error);
        return res.status(500).json({ message: 'Error al obtener datos del feed', error: error.message });
    }
};
exports.sendData = async(req, res) => {
    try {
        const { feedName, value } = req.body;
        const response = await fetch(`${ADAFRUIT_BASE_URL}/${ADAFRUIT_IO_USERNAME}/feeds/${feedName}/data`, {
            method: 'POST',
            headers: {
                'X-AIO-Key': ADAFRUIT_IO_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'value': value
            })
        });
        
        const data = await response.json();
        res.status(200).json({
            message: 'Datos enviados exitosamente',
            data
        });
        return data;
    } catch (error) {
        console.error('Error al enviar datos:', error);
        return res.status(500).json({ message: 'Error al enviar datos', error: error.message });
    }
};
