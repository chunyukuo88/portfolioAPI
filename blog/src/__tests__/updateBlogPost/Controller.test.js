import { updateArticleWithinRow } from '../../updateBlogPost/Controller';
import { getSupabaseClient } from '../../common/factory';

const data = [{}];

jest.mock('../../common/factory');

const loggerSpy = jest.spyOn(console, 'log');

describe('WHEN: given an ID and a payload,', () => {
  it('THEN: updates the entire entry with a new `results` value.', async () => {
    getSupabaseClient.mockImplementationOnce(() => ({
      from: jest.fn(() => ({
        update: jest.fn(() => ({
          eq: jest.fn(() => ({
            data,
          })),
        })),
      }))
    }));
    const id = 4;
    const payload = {
      "title": "Test 12",
      "imageUrl": "https://czzbyiyicvjcorsepbfp.supabase.co/storage/v1/object/public/alexgochenour.xyz-blog-photos/z_Berry%20Bread-min.JPG",
      "body": "Page 4, article 12",
      "likes": 5,
      "views": 50,
    };

    await updateArticleWithinRow(id, payload);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(loggerSpy).toHaveBeenCalledWith();
  });
});
