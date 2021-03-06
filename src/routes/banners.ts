import { ratelimit } from '#lib/api/utils';
import { seconds } from '#utils/common';
import { ApplyOptions } from '@sapphire/decorators';
import { ApiRequest, ApiResponse, methods, Route, RouteOptions } from '@sapphire/plugin-api';

@ApplyOptions<RouteOptions>({ route: 'banners' })
export class UserRoute extends Route {
	@ratelimit(seconds(5), 2)
	public async [methods.GET](_: ApiRequest, response: ApiResponse) {
		const { banners } = this.container.db;
		const entries = await banners.find();
		return response.json(entries);
	}
}
