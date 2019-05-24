## ADD SCRIPT HERE

echo "Creating participant: Big Government"
hurl invoke person participant_register gov "Big Government" -u admin
echo "Creating participant: MIT"
hurl invoke person participant_register mit "MIT" -u user1 -o org1
echo "Creating participant: National Bank"
hurl invoke person participant_register naba "National Bank" -u user1 -o org2
echo "Creating person: John Doe"
hurl invoke person person_create "{\"id\":\"1-100-100\", \"name\": \"John Doe\"}" -u admin
echo "Adding attribute 'birth-year' as the Big Government identity"
hurl invoke person person_addAttribute "1-100-100" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

hurl invoke person person_create "{\"id\":\"1-100-101\", \"name\": \"Carl Jr\"}" -u admin
hurl invoke person person_addAttribute "1-100-101" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1993\", \"issuedDate\": 1554239270 }" -u admin

hurl invoke person person_create "{\"id\":\"1-100-102\", \"name\": \"Alfred\"}" -u admin
hurl invoke person person_addAttribute "1-100-102" "{\"id\": \"birth-year\", \"certifierID\": \"gov\", \"content\": \"1988\", \"issuedDate\": 1554239270 }" -u admin