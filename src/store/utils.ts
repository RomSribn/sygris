type TCreateActionResult = {
  /**
   * action type
   */
  type: string;
  /**
   * action payload
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

type TCreateAction = (
  action_string: TCreateActionResult['type']
) => (payload: TCreateActionResult['payload']) => TCreateActionResult;
/**
 * Create action creator for reducer.
 * @param action_type
 * @returns {TCreateActionResult} (payload) => { type, payload }
 */
const createAction: TCreateAction = (action_type) => (payload) => ({
  type: action_type,
  payload
});

export { createAction };
