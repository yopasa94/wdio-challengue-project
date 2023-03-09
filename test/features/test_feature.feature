Feature: Test scenario

  Scenario: Check number of elemets per category
    Given user opens mall home page
    When user scroll down to carousels
    Then I should see only '(.+)' element per category
