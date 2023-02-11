import * as dotenv from 'dotenv';
import { getSupabaseClient } from '../../common/factory';

dotenv.config();

export async function getCrosswordInfo() {
  console.log('getCrosswordInfo()');
  const supabase = getSupabaseClient();
  const { data, err } = await supabase.from('Crossword-Solutions').select('*');
  if (err) console.error('Error: ', err);
  const response = {
    statusCode: 200,
    data,
  };
  return response;
}
