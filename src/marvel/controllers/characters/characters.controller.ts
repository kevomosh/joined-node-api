import { Body, Controller, Get, Query } from '@nestjs/common';
import { AuthTokenService } from 'src/marvel/services/auth-token/auth-token.service';
import { CharacterService } from 'src/marvel/services/character/character.service';
import { QueryDTO } from 'src/marvel/views/queryDto';

@Controller('characters')
export class CharacterController {
  constructor(
    private characterService: CharacterService,
    private authToken: AuthTokenService,
  ) {}

  @Get()
  getByName(@Body() queryInput: QueryDTO) {
    if (queryInput.name) {
      return this.characterService.getByName(queryInput.name);
    } else {
      return 'hakuna ene';
    }
  }

  @Get('2')
  getNameStartsWith(@Body() queryInut: QueryDTO) {
    const { name, nameStartsWith, offset } = queryInut;

    if (offset && nameStartsWith) {
      return this.characterService.getNSWOffset(offset, nameStartsWith);
    } else if (nameStartsWith) {
      return this.characterService.getByNameStartsWith(
        queryInut.nameStartsWith,
      );
    }
  }

  @Get('byId')
  getById(@Body() queryInut: QueryDTO) {
    if (queryInut.id) {
      return this.characterService.getById(queryInut.id);
    }
  }

  @Get('token')
  getToken() {
    return this.authToken.getToken();
  }

  @Get('thumbnail')
  getThumbnail() {
    return `http://marvel.dl.llnw.net/wdig/marvel/u/prod/marvel/i/mg/6/20/51097abb8e306/${this.getToken()}`;
  }

  @Get('info')
  getCollection(@Query() query: { fieldName: string; charId: number }) {
    return this.characterService.getCollection(query.fieldName, query.charId);
  }
}
