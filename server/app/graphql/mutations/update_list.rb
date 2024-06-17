# frozen_string_literal: true

module Mutations
  class UpdateList < BaseMutation
    field :list, Types::ListType, null: false
    field :response, [String], null: false

    argument :id, String, required: true
    argument :title, String, required: false

    # TODO: define resolve method
    def resolve(id:, title:)
      list = List.find(id)
      params = {}
      params[:title] = title
      list.update(params)
      if list.save
        {
          list: list,
          response: ['List successfully updated.']
        }
      else
        {
          list: nil,
          response: [list.errors.full_messages]
        }
      end
    end
  end
end
