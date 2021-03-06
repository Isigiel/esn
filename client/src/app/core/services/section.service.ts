import { Injectable } from '@angular/core';
import { Section, SectionMembership } from '@esn/client/core/models';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SectionPermissions } from '@esn/shared/section-permissions';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends EntityCollectionServiceBase<Section> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
  ) {
    super('Section', serviceElementsFactory);
  }

  public addUserToSection({ user, section }): Observable<Section> {
    return this.http.post<Section>(`/api/section/${section.id}/members`, {
      userId: user.id,
    });
  }

  public updateMembership(
    membership: SectionMembership,
  ): Observable<SectionMembership> {
    return this.http.put<SectionMembership>(
      `/api/membership/${membership.id}`,
      {
        permissions: membership.permissions,
      },
    );
  }

  public createInvites(data: {
    sectionId: string;
    permissions: SectionPermissions[];
    emails: string[];
  }) {
    console.log(data);
    return this.http.post('/api/invite', data);
  }
}
