﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Skyra.Database;
using Skyra.Database.Models;

namespace Skyra.UnitTests.Grpc.Stubs
{
	public class TestDatabase : IDatabase
	{
		private readonly Dictionary<string, int> _data = new Dictionary<string, int>();

		public Task<PointsQuery> AddUserPointsAsync(string userId, int points)
		{
			if (_data.TryGetValue(userId, out var value))
			{
				_data[userId] = value + points;
			}
			else
			{
				_data[userId] = points;
			}

			return Task.FromResult(new PointsQuery
			{
				Points = _data[userId],
				Success = true
			});
		}

		public Task<PointsQuery> GetUserPointsAsync(string userId)
		{
			if (!_data.ContainsKey(userId))
			{
				_data[userId] = 0;
			}

			return Task.FromResult(new PointsQuery
			{
				Points = _data[userId],
				Success = true
			});
		}
	}
}