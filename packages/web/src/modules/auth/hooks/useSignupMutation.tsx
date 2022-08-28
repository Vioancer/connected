import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { navigate } from 'gatsby';
import React from 'react';
import axios from '../../shared/config/axios';
import { ImageSettings } from '../../shared/types/api';
import { RQ } from '../../shared/types/react-query';

const useSignupMutation = () => {
	const queryClient = useQueryClient();
	const { data, mutate, isLoading } = useMutation<
		any,
		any,
		{
			name: string;
			email: string;
			password: string;
			passwordConfirm: string;
			photo: File | null;
			imageSettings: string;
		},
		any
	>(
		async (data) => {
			const res = await axios({
				url: '/auth/signup',
				method: 'post',
				data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			return res.data;
		},
		{
			onSuccess(data) {
				queryClient.setQueryData([RQ.LOGGED_IN_USER_QUERY], data.user);
				navigate('/app/feed');
			},
		}
	);

	return {
		data,
		mutate,
		isLoading,
	};
};

export default useSignupMutation;
