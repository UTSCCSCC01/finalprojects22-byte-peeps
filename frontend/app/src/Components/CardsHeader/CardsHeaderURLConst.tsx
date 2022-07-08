type FacebookCardResponse = {
  totalPosts: number;
  totalReactions: number;
  totalComments: number;
};

export type CardHeaderResponse = FacebookCardResponse;

export enum CardHeaderURLRequest {
  FacebookCardHeader = '/facebook/stats',
}
