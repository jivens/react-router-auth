import { gql } from 'apollo-boost';

export const getUserToken = gql`
  query($email: String!, $password: String!) {
    loginUser_Q(email: $email, password: $password) {
      password
    }
  }
`;

export const getUserFromToken = gql`
  query {
    getUserFromToken_Q {
      id
      username
      first
      last
      email
      password
      roles {
        role_code
        id
      }
    }
  }
`;

export const insertRootMutation = gql`
  mutation insert_a_root($editnote: String!, $english: String!, $salish: String, $nicodemus: String!, $root: String!, $number: Int, $sense: String, $symbol: String, $grammar: String, $crossref: String, $variant: String, $cognate: String) {
    insert_roots_one(object: {editnote: $editnote, english: $english, salish: $salish, nicodemus: $nicodemus, root: $root, number: $number, sense: $sense, symbol: $symbol, grammar: $grammar, crossref: $crossref, variant: $variant, cognate: $cognate}) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      root
      number
      sense
      symbol
      grammar
      crossref
      variant
      cognate
      updatedAt
      userId
    }
  }
`;

export const insertAffixMutation = gql`
  mutation insert_an_affix($editnote: String, $english: String!, $link: String, $nicodemus: String!, $page: String, $salish: String, $type: Int!) {
    insert_affixes_one(object: {editnote: $editnote, english: $english, link: $link, nicodemus: $nicodemus, page: $page, salish: $salish, type: $type}) {
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      userId
    }
  }
`;

export const insertStemMutation = gql`
  mutation insert_a_stem($editnote: String!, $english: String!, $salish: String, $nicodemus: String!, $doak: String = "", $note: String = "", $reichard: String = "", $category: Int!) {
    insert_stems_one(object: {editnote: $editnote, english: $english, salish: $salish, nicodemus: $nicodemus, doak: $doak, note: $note, reichard: $reichard, category: $category}) {
      editnote
      english
      id
      nicodemus
      salish
      userId
      doak
      note
      reichard
      createdAt
      updatedAt
      stem_category {
        value
        id
      }
    }
  }
`;


export const getAffixByIdQuery = gql`
  query GetAffixById($id: Int!) {
    affixes_by_pk(id: $id) {
      editnote
      createdAt
      id
      english
      link
      nicodemus
      page
      salish
      updatedAt
      user {
        username
        id
      }
      affix_type {
        id
        value
      }
    }
  }
`;

export const getStemByIdQuery = gql`
  query GetStemById($id: Int!) {
    stems_by_pk(id: $id) {
      editnote
      createdAt
      id
      english
      doak
      nicodemus
      salish
      updatedAt
      user {
        username
        id
      }
      stem_category {
        id
        value
      }
    }
  }
`;

export const getRootByIdQuery = gql`
  query GetRootById($id: Int!) {
    roots_by_pk(id: $id) {
      editnote
      createdAt
      updatedAt
      id
      english
      grammar
      nicodemus
      number
      root
      salish
      sense
      symbol
      crossref
      cognate
      variant
      user {
        username
        id
      }
    }
  }
`

export const updateAffixMutation = gql`
  mutation updateAnAffix($id: Int!, $editnote: String!, $english: String!, $salish: String!, $nicodemus: String!, $link: String!, $page: String!, $type: Int!){
    update_affixes_by_pk(pk_columns: {id: $id},
    _set: {
        english: $english,
        nicodemus: $nicodemus,
        editnote: $editnote,
        salish: $salish,
        link: $link,
        page: $page,
        type: $type
      }
    )
    {
      createdAt
      editnote
      english
      id
      link
      nicodemus
      page
      salish
      type
      updatedAt
      userId
    }
  }
`;

export const updateStemMutation = gql`
  mutation updateAStem($id: Int!, $editnote: String!, $english: String!, $salish: String!, $nicodemus: String!, $doak: String!, $reichard: String!, $category: Int!){
    update_stems_by_pk(pk_columns: {id: $id},
    _set: {
        english: $english,
        nicodemus: $nicodemus,
        editnote: $editnote,
        salish: $salish,
        doak: $doak,
        reichard: $reichard,
        category: $category
      }
    )
    {
      createdAt
      editnote
      english
      id
      doak
      nicodemus
      reichard
      salish
      category
      updatedAt
      userId
    }
  }
`;

export const updateRootMutation = gql`
  mutation updateARoot($id: Int!, $editnote: String!, $english: String!, $salish: String, $nicodemus: String!, $root: String!, $number: Int, $sense: String, $symbol: String, $grammar: String, $crossref: String, $variant: String, $cognate: String){
    update_roots_by_pk(pk_columns: {id: $id},
    _set: {
        editnote: $editnote,
        english: $english,
        nicodemus: $nicodemus,
        salish: $salish,
        root: $root,
        number: $number,
        sense: $sense,
        symbol: $symbol,
        grammar: $grammar,
        crossref: $crossref,
        variant: $variant
      }
    )
    {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      root
      number
      sense
      symbol
      grammar
      crossref
      variant
      updatedAt
      userId
    }
  }
`

export const deleteAffixMutation = gql`
  mutation($id: Int!) {
    delete_affixes_by_pk(id: $id) {
      id
    }
  }
`;

export const deleteStemMutation = gql`
  mutation($id: Int!) {
    delete_stems_by_pk(id: $id) {
      id
    }
  }
`;

export const deleteRootMutation = gql`
  mutation($id: Int!) {
    delete_roots_by_pk(id: $id) {
      id
    }
  }
`;


export const updateUserMutation = gql`
  mutation($first: String!, $last: String!, $username: String!, $email: String!, $password: String!) {
    updateUser_M(first: $first, last: $last, username: $username, email: $email, password: $password) {
      id
      first
      last
      username
      email
      password
      roles
    }
  }
`;

export const getUsersQuery = gql`
  query($limit: Int, $offset: Int) {
    users_Q(limit: $limit, offset: $offset) {
      id
      first
      last
      username
      password
      email
    }
  }
`;

export const getUsernamesQuery = gql`
  query {
    users {
      username
      id
    }
  }
`;

export const getLogQuery = gql`
  query getLogQuery($limit: Int, $offset: Int, $log_order: [audit_logged_actions_order_by!], $where: audit_logged_actions_bool_exp) {
    audit_logged_actions_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    audit_logged_actions(limit: $limit, offset: $offset, where: $where, order_by: $log_order) {
      action
      changed_fields
      hasura_user
      row_data
      schema_name
      table_name
      audit_user {
        id
        email
        first
        last
        username
      }
    }
  }
  `;

export const getAffixTypesQuery = gql`
  query {
    affix_types {
      value
      id
    }
  }
`;

export const getStemCategoriesQuery = gql`
  query {
    stem_categories {
      value
      id
    }
  }
`;

export const getTextsById = gql`
  query getTextByIdQuery($id: Int) {
    texts(where: {id: {_eq: $id}}) {
      id
      title
      speaker
      cycle
      rnumber
      tnumber
      audiosets {
        id
        speaker
        title
        textId
        audiosets_audiofiles {
          audiosetId
          direct
          id
          src
          subdir
          type
          audio_with_path
        }
      }
      texts_textfiles {
        fileType
        id
        msType
        resType
        src
        subdir
        textId
        textfile_with_path
        textimages {
          id
          src
          subdir
          textimage_with_path
          textFileId
        }
      }
      user {
        id
        last
        first
        username
      }
    }
  }
`;

// need aggregate permission to get the total count
export const getAffixesQuery = gql`
  query getAffixesQuery($limit: Int, $offset: Int, $affix_order: [affixes_order_by!], $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(limit: $limit, offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      editnote
      link
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      id
      user {
        username
        id
      }
    }
  }
  `;

export const getAnonAffixesQuery = gql`
  query getAnonAffixesQuery($limit: Int, $offset: Int, $affix_order: [affixes_order_by!], $where: affixes_bool_exp) {
    affixes_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    affixes(limit: $limit, offset: $offset, where: $where, order_by: $affix_order) {
      english
      nicodemus
      createdAt
      link
      page
      salish
      affix_type {
        value
        id
      }
      updatedAt
      id
    }
  }
  `;

export const getRootsQuery = gql`
  query getRootsQuery($where: roots_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $root_order: [roots_order_by!] = {}) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where, limit: $limit, offset: $offset, order_by: $root_order) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      variant
      user {
        username
        id
      }
    }
  }
  `;
  
export const getAnonRootsQuery = gql`
  query getAnonRootsQuery($where: roots_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $root_order: [roots_order_by!] = {}) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where, limit: $limit, offset: $offset, order_by: $root_order) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      variant
    }
  }
`;

export const getStemsQuery = gql`
  query getStemsQuery($where: stems_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $stem_order: [stems_order_by!] = {}) {
    stems_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    stems(where: $where, limit: $limit, offset: $offset, order_by: $stem_order) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      updatedAt
      user {
        username
        id
      }
      reichard
      note
      doak
      stem_category {
        id
        value
      }
    }
  }
`;
  
export const getAnonStemsQuery = gql`
  query getAnonStemsQuery($where: stems_bool_exp = {}, $limit: Int = 10, $offset: Int = 10, $stem_order: [stems_order_by!] = {}) {
    stems_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    stems(where: $where, limit: $limit, offset: $offset, order_by: $stem_order) {
      createdAt
      editnote
      english
      id
      nicodemus
      salish
      updatedAt
      reichard
      note
      doak
      stem_category {
        id
        value
      }
    }
  }
`;
    
export const getAffixHistoryByIdQuery = gql`
  query getAffixHistoryById($row_data: jsonb!, $table_name: String!) {
    audit_logged_actions(where: {table_name: {_eq: $table_name}, row_data: {_contains: $row_data}}, order_by: {action_tstamp_clk: asc})  {
      action
      action_tstamp_clk
      action_tstamp_stm
      action_tstamp_tx
      application_name
      changed_fields
      client_addr
      client_port
      client_query
      event_id
      hasura_user
      relid
      row_data
      schema_name
      session_user_name
      statement_only
      table_name
      transaction_id
    }
  } 
`;

export const getRootHistoryByIdQuery = gql`
  query getRootHistoryById($row_data: jsonb!, $table_name: String!) {
    audit_logged_actions(where: {table_name: {_eq: $table_name}, row_data: {_contains: $row_data}}, order_by: {action_tstamp_clk: asc})  {
      action
      action_tstamp_clk
      action_tstamp_stm
      action_tstamp_tx
      application_name
      changed_fields
      client_addr
      client_port
      client_query
      event_id
      hasura_user
      relid
      row_data
      schema_name
      session_user_name
      statement_only
      table_name
      transaction_id
    }
  } 
`;

export const getTextsQuery = gql`
  query getTextsQuery($limit: Int, $offset: Int, $order: [texts_order_by!], $where: texts_bool_exp) {
    texts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    texts(limit: $limit, offset: $offset, order_by: $order, where: $where) {
      id
      title
      speaker
      cycle
      rnumber
      tnumber
      audiosets {
        id
        speaker
        title
        textId
        audiosets_audiofiles {
          audiosetId
          direct
          id
          src
          subdir
          type
          audio_with_path
        }
      }
      texts_textfiles {
        fileType
        id
        msType
        resType
        src
        subdir
        textId
        textfile_with_path
        textfilemetadata {
          metadata
          textFileId
        }
        textimages {
          id
          src
          subdir
          textimage_with_path
          textFileId
        }
      }
      user {
        id
        last
        first
        username
      }
    }
  } 
`;

export const getAudioSetsQuery = gql`
  query getAudioSetsQuery($limit: Int, $offset: Int, $order: [audiosets_order_by!], $where: audiosets_bool_exp) {
    audiosets_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    audiosets(limit: $limit, offset: $offset, order_by: $order, where: $where) {
      id
      speaker
      title
      textId
      audiosets_audiofiles {
        audiosetId
        direct
        id
        src
        subdir
        type
        audio_with_path
      }
      user {
        id
        last
        first
        username
      }
      text {
        cycle
        id
        speaker
        rnumber
        title
        tnumber
      }
    }
  }
`;

export const getAudioSetById = gql`
  query getAudioSetsByIdQuery($id: Int) {
    audiosets(where: {id: {_eq: $id}}) {
        id
        speaker
        title
        textId
        audiosets_audiofiles {
          audiosetId
          direct
          id
          src
          subdir
          type
          audio_with_path
        }
      user {
        id
        last
        first
        username
      }
    }
  }
`;

export const getElicitationSetsQuery = gql`
  query getElicitationsetsQuery($limit: Int, $offset: Int, $order: [elicitationsets_order_by!], $where: elicitationsets_bool_exp) {
    elicitationsets_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    elicitationsets(limit: $limit, offset: $offset, order_by: $order, where: $where) {
      editnote
      id
      language
      speaker
      title
      transcription
      user {
        email
        first
        id
        last
      }
      elicitationfiles {
        direct
        elicitationSetId
        elicitationfiles_with_path
        id
        src
        type
      }
    }
  }
`;

export const insertUserMutation = gql `
  mutation insertUserMutation($email: String!, $first: String!, $last: String!, $username: String!, $password: String!) {
    insert_users_one(object: {first: $first, last: $last, password: $password, username: $username, email: $email}) {
      createdAt
      updatedAt
      first
      id
      last
      password
      username
      email
    }
  }
`
export const isHuman = gql`
  query($token: String!) {
    isHuman_Q(token: $token) {
      token
    }
  }
`;

export const getSpellingListQuery = gql`
  query getSpellingListQuery($limit: Int, $offset: Int, $spellings_order: [spellings_order_by!], $where: spellings_bool_exp) {
    spellings_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    spellings(limit: $limit, offset: $offset, where: $where, order_by: $spellings_order) {
      english
      nicodemus
      createdAt
      id
      note
      reichard
      salish
      updatedAt
      id
    }
  }
`;

export const getConsonantsQuery = gql `
  query getConsonantsQuery($limit: Int, $offset: Int, $consonant_order: [consonants_order_by!], $where: consonants_bool_exp) {
    consonants_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    consonants(limit: $limit, offset: $offset, where: $where, order_by: $consonant_order) {
      alveolar
      alveopalatal
      glottal
      labial
      lateral
      manner
      orthography
      palatal
      pharyngeal
      secondary
      uvular
      velar
      voice
      createdAt
      updatedAt
      id
    }
  }
`

export const getVowelsQuery = gql `
  query getVowelsQuery($limit: Int, $offset: Int, $vowel_order: [vowels_order_by!], $where: vowels_bool_exp) {
    vowels_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    vowels(limit: $limit, offset: $offset, where: $where, order_by: $vowel_order) {
      orthography
      height
      front
      central
      back
      createdAt
      updatedAt
      id
    }
  }
`

export const getBibliographyQuery = gql `
  query getBibliographyQuery($limit: Int, $offset: Int, $bibliographies_order: [bibliographies_order_by!], $where: bibliographies_bool_exp) {
    bibliographies_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    bibliographies(limit: $limit, offset: $offset, where: $where, order_by: $bibliographies_order) {
      author
      year
      title
      reference
      link
      linktext
      createdAt
      updatedAt
      id
    }
  }
`

export const getExactRootQuery = gql `
  query ExactRoot($root: String!) {
    roots(where: {root: {_ilike: $root}}) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      userId
      variant
    }
  }
`

export const getBrowseRootQuery = gql `
  query BrowseRoot($where: roots_bool_exp!) {
    roots_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    roots(where: $where) {
      cognate
      createdAt
      crossref
      editnote
      english
      grammar
      id
      nicodemus
      number
      root
      salish
      sense
      symbol
      updatedAt
      userId
      variant
    }
  }
`

export const getMetadataQuery = gql `
  query Metadata($textFileId: Int!) {
    textfilemetadata(where: {textFileId: {_eq: $textFileId}}) {
      createdAt
      id
      metadata
      textFileId
      textfile {
        createdAt
        fileType
        id
        msType
        resType
        src
        subdir
        textId
        textfile_with_path
      }
    }
  }
`
