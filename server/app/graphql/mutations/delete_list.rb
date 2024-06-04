# frozen_string_literal: true

module Mutations
  class DeleteList < BaseMutation
    field :list, Types::ListType, null: false
    field :message, [String], null: false

    argument :id, String, required: true

    def resolve(id:)
      list = List.find(id)
      if list.destroy!
        {
          list: list,
          message: []
        }
      else
        {
          list: nil,
          message: [list.errors.full_message]
        }
      end
    end
  end
end
