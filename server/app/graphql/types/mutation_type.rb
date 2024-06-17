# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :update_list, mutation: Mutations::UpdateList
    field :create_list, mutation: Mutations::CreateList
    field :delete_list, mutation: Mutations::DeleteList
    field :delete_task, mutation: Mutations::DeleteTask
    field :update_task, mutation: Mutations::UpdateTask
    field :create_task, mutation: Mutations::CreateTask

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
