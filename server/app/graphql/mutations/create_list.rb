# frozen_string_literal: true

module Mutations
  class CreateList < BaseMutation

    field :list, Types::ListType, null: false
    field :message, [String], null: false

    argument :title, String, required: true


    def resolve(title:)
      list = List.create(title: title)
      if list.save
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
