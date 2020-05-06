/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import * as useDispatchedActionsHook from 'hooks/useDispatchedActions';
import ReposSearch from '../ReposSearch';
import ReposList from '../components/ReposList';
import { BASE_URL } from '../constants';

jest.mock('components/ErrorBoundary', () => props => <error-boundary-mock {...props} />);
jest.mock('../components/ReposList', () => props => <repos-list-mock {...props} />);

describe('ReposSearch component', () => {
  beforeEach(() => jest.clearAllMocks());

  const defaultProps = {};
  const getWrapper = props => mount(<ReposSearch {...defaultProps} {...props} />);

  it('should render without crash, search repos and display repos list', () => {
    const getRepos = jest.fn().mockReturnValue(Promise.resolve());
    const clearRepos = jest.fn();
    const selectorSpy = jest.spyOn(redux, 'useSelector');
    selectorSpy.mockImplementation(() => ({ repos: [] }));
    jest
      .spyOn(useDispatchedActionsHook, 'default')
      .mockImplementation(() => ({ getRepos, clearRepos }));
    const wrapper = getWrapper();
    expect(wrapper.find(ReposList)).toHaveLength(1);

    expect(wrapper.find(ReposList).prop('repos')).toHaveLength(0);
    const onChangeFunc = wrapper.find('.ReposSearch__input').prop('onChange');
    act(() => {
      onChangeFunc({ target: { value: 'abcd' } });
    });

    wrapper.update();

    expect(wrapper.find('.ReposSearch__input').prop('value')).toBe('abcd');
    expect(getRepos).toHaveBeenCalled();
    expect(getRepos).toHaveBeenCalledWith(`${BASE_URL}abcd`);

    selectorSpy.mockImplementation(() => ({
      repos: [
        {
          id: 123,
          name: 'react',
          full_name: 'facebook/react',
          created_at: '2020-05-07',
          updated_at: '2020-05-07',
          owner: { login: 'abcd', avatar_url: '' },
        },
      ],
    }));

    const updatedWrapper = getWrapper();

    expect(updatedWrapper.find(ReposList).prop('repos')).toHaveLength(1);
  });
});
