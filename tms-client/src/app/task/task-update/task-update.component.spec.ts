const request = require('supertest');
const app = require('../../../src/app');
const { Plant } = require('../../../src/models/task');

jest.mock('../../../src/models/task'); // Mock the Plant model
describe('Task API', () => {
  describe('GET /api/tasks', () => {
    it('should get all tasks', async () => {
      Task.find.mockResolvedValue([{ title: 'Rose' }]); // Mock the find method
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].name).toBe('Rose');
    });

    it('should handle errors', async () => {
      Task.find.mockRejectedValue(new Error('Database error')); // Mock an error
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/tasks/:taskId', () => {
    it('should get a task by ID', async () => {
      Task.findOne.mockResolvedValue({ title: 'Rose' }); // Mock the findOne method
      const response = await request(app).get(
        '/api/tasks/507f1f77bcf86cd799439011'
      ); // Use a valid ObjectId
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Rose');
    });
    it('should handle errors', async () => {
      Task.findOne.mockRejectedValue(new Error('Database error')); // Mock an error
      const response = await request(app).get(
        '/api/tasks/507f1f77bcf86cd799439011'
      ); // Use a valid ObjectId
      expect(response.status).toBe(500);
    });
  });
  describe('POST /api/tasks/:taskId', () => {
    it('should create a task successfully', async () => {
      Task.prototype.save.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
      }); // Mock the save method
      const response = await request(app).post('/api/tasks/1').send({
        title: 'Rose',
        priority: 'Flower',
        dueDate: '2023-04-15T00:00:00.000Z',
        status: 'Planted', // Ensure all required properties are included
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task created successfully');
    });

    it('should return validation errors for invalid type', async () => {
      const response = await request(app).post('/api/tasks/1').send({
        title: 'Rose',
        priority: 'InvalidType', // Invalid: not in enum
        dueDate: '2023-04-15T00:00:00.000Z',
        status: 'Planted',
      });
      expect(response.status).toBe(400);
      const errorMessages = response.body.message;
      expect(errorMessages).toContain(
        'must be equal to one of the allowed values'
      );
    });
  });
  describe('PATCH /api/tasks/:taskId', () => {
    it('should update a task successfully', async () => {
      const mockPlant = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Rose',
        priority: 'High',
        status: 'Completed',
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(true),
      };
      Task.findOne.mockResolvedValue(mockTask);
      const response = await request(app)
        .patch('/api/tasks/507f1f77bcf86cd799439011')
        .send({
          title: 'Rose',
          priority: 'Flower',
          status: 'Growing', // Ensure all required properties are included
        });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Plant updated successfully');
    });
    it('should return validation errors for invalid data', async () => {
      const mockPlant = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Rose',
        priority: 'Flower',
        status: 'Growing',
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(true),
      };

      Plant.findOne.mockResolvedValue(mockPlant);
      const response = await request(app)
        .patch('/api/plants/507f1f77bcf86cd799439011')
        .send({
          title: 'R', // Invalid: too short
          priority: 'InvalidType', // Invalid: not in enum
          status: 'InvalidStatus', // Invalid: not in enum
        });
      expect(response.status).toBe(400);
      const errorMessages = response.body.message;
      expect(errorMessages).toContain('must NOT have fewer than 3 characters');
    });
  });

});

