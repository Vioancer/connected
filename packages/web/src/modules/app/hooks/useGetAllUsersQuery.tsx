import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from '../../shared/config/axios';
import { RQ } from '../../shared/types/react-query';

const useGetAllUsersQuery = (search = '') => {
	const [page, setPage] = React.useState(1);

	const result = useQuery(
		[RQ.GET_ALL_USERS_QUERY, page, search],
		async () => {
			const res = await axios({
				url: '/users',
				method: 'get',
				params: {
					pageParam: page,
					search,
				},
			});

			return res.data;
		},
		{ keepPreviousData: true }
	);

	return { page, setPage, ...result };
};

export default useGetAllUsersQuery;
