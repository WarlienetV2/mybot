import '#lib/setup';
import { client } from '#mocks/MockInstances';

afterAll(() => {
	client.destroy();
});
