export const SET_FOCUS_MODE = 'SET_FOCUS_MODE';
export const SET_SHOW_TOOLBOX = 'SET_SHOW_TOOLBOX';
export const ADD_TOOL = 'ADD_TOOL';
export const REMOVE_TOOL = 'REMOVE_TOOL';
export const SET_REMOVE_TOOL_STATE = 'SET_REMOVE_TOOL_STATE';
export const SET_TOOL_LIST = 'SET_TOOL_LIST';
export const SET_SEARCH_ENGINE_LIST = 'SET_SEARCH_ENGINE_LIST';
export const SET_SEARCH_ENGINE_IDX = 'SET_SEARCH_ENGINE_IDX';
export const GET_SEARCH_ENGINE_INDEX = 'SEARCH_ENGINE_INDEX';

const controllers = 'controllers';
export const CONTROLLERS = {
  SET_FOCUS_MODE: `${controllers}/${SET_FOCUS_MODE}`,
  SET_SHOW_TOOLBOX: `${controllers}/${SET_SHOW_TOOLBOX}`,
  SET_REMOVE_TOOL_STATE: `${controllers}/${SET_REMOVE_TOOL_STATE}`,
  SET_SEARCH_ENGINE_IDX: `${controllers}/${SET_SEARCH_ENGINE_IDX}`,
  GET_SEARCH_ENGINE_INDEX: `${controllers}/${GET_SEARCH_ENGINE_INDEX}`
};

const settings = 'settings';
export const SETTINGS = {
  ADD_TOOL: `${settings}/${ADD_TOOL}`,
  REMOVE_TOOL: `${settings}/${REMOVE_TOOL}`,
  SET_TOOL_LIST: `${settings}/${SET_TOOL_LIST}`,
  SET_SEARCH_ENGINE_LIST: `${settings}/${SET_SEARCH_ENGINE_LIST}`
};

export default {};
