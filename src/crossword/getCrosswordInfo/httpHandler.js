import { getSupabaseClient } from '../../common/factory';

export async function getCrosswordInfo(logger) {
  logger('getCrosswordInfo()');
  const supabase = getSupabaseClient();
  const { data, err } = await supabase.from('Crossword-Solutions').select('*');
  if (err) console.error('Error: ', err);
  const response = {
    statusCode: 200,
    data,
  };
  return response;
}
