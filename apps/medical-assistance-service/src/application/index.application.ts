import { CreateRecommendationDto } from "./recommendation/dto/create-recommendation.dto";
import { UpdateRecommendationDto } from "./recommendation/dto/update-recommendation.dto";
import { RecommendationServiceImpl } from "./recommendation/services/recommendationImpl.service";
import { CreateSuggestionDto } from "./suggestion/dto/create-suggestion.dto";
import { UpdateSuggestionDto } from "./suggestion/dto/update-suggestion.dto";
import { SuggestionServiceImpl } from "./suggestion/services/suggestionImpl.service";


export{
   CreateRecommendationDto,
   UpdateRecommendationDto,
   RecommendationServiceImpl,

   CreateSuggestionDto,
   UpdateSuggestionDto,
   SuggestionServiceImpl,
}