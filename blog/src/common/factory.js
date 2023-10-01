import { createClient } from '@supabase/supabase-js';
import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

async function getSupabaseDBKeyFromSSM() {
  const ssm = new AWS.SSM();
  const parameterName = process.env.SSM_PARAMETER_NAME_FOR_SUPABASE;

  try {
    const response = await ssm.getParameter({ Name: parameterName }).promise();
    if (response?.Parameter?.Value) {
      return response.Parameter.Value;
    }
    throw new Error(`Parameter ${parameterName} not found or has no value.`);
  } catch (error) {
    console.log('oh crap: ', error);
    throw new Error(
      `Error fetching parameter ${parameterName}: ${error.message}`,
    );
  }
}

export async function getSupabaseClient() {
  const supabaseDBKey = await getSupabaseDBKeyFromSSM();

  return createClient(process.env.SUPABASE_URL, supabaseDBKey);
}
